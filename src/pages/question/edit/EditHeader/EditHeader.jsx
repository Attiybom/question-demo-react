import React, { useState } from "react";
import styles from "./EditHeader.module.scss";
import { Button, Input, Space, Typography, message } from "antd";
import { LeftOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "@/hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "@/store/pageInfoReducer";
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo";
import { useRequest, useKeyPress, useDebounceEffect } from "ahooks";
import { updateQuestionListService } from "@/services/question";

const { Title } = Typography;

const EditHeader = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  // 问卷标题， 显示和修改标题
  const TitleElem = () => {
    const { title } = useGetPageInfo();

    function handleTitlechange(e) {
      const newTitle = e.target.value.trim();
      if (!newTitle) return;

      dispatch(changePageTitle(newTitle));
    }

    const [editState, setEditState] = useState(false);

    if (editState) {
      return (
        <Input
          onChange={handleTitlechange}
          value={title}
          onPressEnter={() => setEditState(false)}
        ></Input>
      );
    }

    return (
      <Space>
        <Title>{title}</Title>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => setEditState(true)}
        ></Button>
      </Space>
    );
  };

  // 保存按钮
  const SaveButtonElem = () => {
    const { id } = useParams(); //获取url中的问卷id

    const { componentList = [] } = useGetComponentsInfo();

    const pageInfo = useGetPageInfo();

    const { loading, run: save } = useRequest(
      async () => {
        if (id) {
          await updateQuestionListService(id, { ...pageInfo, componentList });
        }
      },
      {
        manual: true,
        debounceWait: 500,
        onSuccess() {
          message.success("保存成功！");
        },
      }
    );

    // 快捷键保存
    useKeyPress(["ctrl.s", "meta.s"], (e) => {
      // save()
      e.preventDefault();
      if (!loading) save();
    });

    // 自动保存
    useDebounceEffect(
      () => {
        save();
      },
      [componentList, pageInfo],
      {
        wait: 1000,
      }
    );

    return (
      <Button
        disabled={loading}
        onClick={save}
        icon={loading ? <LoadingOutlined></LoadingOutlined> : null}
      >
        保存
      </Button>
    );
  };

  // 发布按钮
  const PublishButtonElem = () => {
    const { id } = useParams(); //获取url中的问卷id

    const { componentList = [] } = useGetComponentsInfo();

    const pageInfo = useGetPageInfo();

    const { loading, run: publish } = useRequest(
      async () => {
        if (id) {
          await updateQuestionListService(id, {
            ...pageInfo,
            componentList,
            isPublished: true, // 为true说明已经发布
          });
        }
      },
      {
        manual: true,
        debounceWait: 500,
        onSuccess() {
          message.success("发布成功");
          nav(`/question/stat/${id}`);
        },
      }
    );

    return (
      <Button disabled={loading} onClick={publish} type="primary">
        发布
      </Button>
    );
  };

  return (
    <div className={styles[`header-wrapper`]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined></LeftOutlined>}
              onClick={() => nav(-1)}
            >
              返回
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButtonElem></SaveButtonElem>
            <PublishButtonElem></PublishButtonElem>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
