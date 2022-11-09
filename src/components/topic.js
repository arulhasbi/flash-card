import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./topics.css";
import { useSelector, useDispatch } from "react-redux";
import { loadIcons, selectAllIcons } from "../features/icons/iconsSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export const Topic = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [nameTopic, setNameTopic] = useState("");

  const dispatch = useDispatch();
  const allIcons = useSelector(selectAllIcons);

  useEffect(() => {
    dispatch(loadIcons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameTopic);
    console.log(selectedIcon);
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
                >
                  Add Topic
                </button>
              </form>
            </div>
          )}
        </section>
      </TopicMaxWidth>
    </TopicWrapper>
  );
};

const TopicWrapper = styled.div``;
const TopicMaxWidth = styled.div``;
