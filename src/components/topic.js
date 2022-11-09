import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./topics.css";
import { useSelector, useDispatch } from "react-redux";
import { addTopic } from "../features/topics/topicsSlice";
import { loadIcons, selectAllIcons } from "../features/icons/iconsSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Modal } from "./modal";
import { selectAddTopicStatus } from "../features/topics/topicsSlice";

export const Topic = () => {
  const [nameTopic, setNameTopic] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  const [isCreate, setIsCreate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const allIcons = useSelector(selectAllIcons);
  const addTopicStatus = useSelector(selectAddTopicStatus);

  useEffect(() => {
    dispatch(loadIcons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (addTopicStatus.isPending) {
      updateModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTopicStatus.isPending]);

  const updateModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTopic({
        name: nameTopic,
        iconID: selectedIcon,
      })
    );
  };

  return (
    <TopicWrapper className="mt-10">
      <TopicMaxWidth>
        <section>
          {!isCreate && (
            <div className="text-center">
              <p className="font-bold text-2xl">Topics</p>
              <button
                type="button"
                className="font-bold border mt-5 py-2 px-6 button-15"
                onClick={() => setIsCreate(!isCreate)}
              >
                Create New Topic
              </button>
            </div>
          )}
          {isCreate && (
            <div>
              <div className="flex items-center">
                <div className="grow flex items-center">
                  <button type="button" onClick={() => setIsCreate(!isCreate)}>
                    <ArrowLeftIcon className="h-6 w-6 text-black" />
                  </button>
                </div>
                <p className="font-bold text-2xl text-center grow">
                  Create a new topic
                </p>
                <div className="grow"></div>
              </div>
              <form className="text-center" onSubmit={handleSubmit}>
                <div className="form-control mt-5">
                  <input
                    required
                    type="text"
                    name="topic-name"
                    placeholder="Topic Name"
                    className="w-full py-2 px-3 rounded-lg border-2 border-cyan-600"
                    value={nameTopic}
                    onChange={({ target }) => setNameTopic(target.value)}
                  />
                </div>
                <div className="form-control mt-5">
                  <select
                    required
                    name="icon"
                    id="icon"
                    className="w-full py-2.5 px-3 rounded-lg border-2 border-cyan-600"
                    value={selectedIcon}
                    onChange={({ target }) => setSelectedIcon(target.value)}
                  >
                    <option value="">Choose an icon</option>
                    {allIcons.length !== 0 &&
                      allIcons.map((icon) => (
                        <option key={icon.id} value={icon.id}>
                          {icon.name}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="font-bold border mt-5 py-2 px-6 button-15"
                  disabled={addTopicStatus.isPending}
                >
                  {addTopicStatus.isPending && "Adding..."}{" "}
                  {!addTopicStatus.isPending && "Add Topic"}
                </button>
              </form>
            </div>
          )}
        </section>
        <Modal
          showModal={showModal}
          onShowModal={updateModal}
          title="Create status"
          body={`Succefully adding ${nameTopic} to topic list`}
          buttonMessage="Got, it. thanks!"
        />
      </TopicMaxWidth>
    </TopicWrapper>
  );
};

const TopicWrapper = styled.div``;
const TopicMaxWidth = styled.div``;
