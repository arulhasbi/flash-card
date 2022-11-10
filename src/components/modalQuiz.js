import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { loadCards } from "../features/cards/cardsSlice";
import { selectAllCard } from "../features/cards/cardsSlice";
import { XCircleIcon } from "@heroicons/react/24/solid";

export const ModalQuiz = (props) => {
  const dispatch = useDispatch();
  const cards = useSelector(selectAllCard);
  const [currentCard, setCurrentCard] = useState(0);
  const [flip, setFlip] = useState(false);
  const closeModal = () => {
    setCurrentCard(0);
    setFlip(false);
    props.onShowModal();
  };
  useEffect(() => {
    dispatch(loadCards(props.quiz.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.quiz.id]);
  return (
    <>
      <Transition appear show={props.showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-baseline gap-4"
                  >
                    <p className="mt-3 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 drop-shadow-md">
                      {props.quiz.title}
                    </p>
                    <span className="font-medium text-indigo-800 rounded-lg text-sm">
                      Cick question to get the answer!
                    </span>
                  </Dialog.Title>
                  <div className="my-4">
                    {cards.length > 0 && (
                      <div
                        className="h-20 flex justify-center items-center hover:cursor-pointer"
                        onClick={() => setFlip(!flip)}
                      >
                        <p className="font-bold text-2xl drop-shadow-sm">
                          {!flip
                            ? cards[currentCard].front
                            : cards[currentCard].back}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {cards.length > 0 &&
                      cards.map((card, index) => (
                        <div
                          key={card.id}
                          className={`w-full h-2 bg-indigo-${
                            index === currentCard ? "700" : "200"
                          } rounded-lg bg-indigo`}
                        ></div>
                      ))}
                  </div>
                  <div className="mt-4 flex">
                    {currentCard > 0 && cards.length > 0 && (
                      <button
                        type="button"
                        className="font-bold inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 block"
                        onClick={() => {
                          setFlip(false);
                          setCurrentCard(currentCard - 1);
                        }}
                      >
                        Previous
                      </button>
                    )}
                    {!(currentCard + 1 === cards.length) && cards.length > 0 && (
                      <button
                        type="button"
                        className="font-bold inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 block ml-auto"
                        onClick={() => {
                          setFlip(false);
                          setCurrentCard(currentCard + 1);
                        }}
                      >
                        Next
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    className="absolute top-[10px] right-[20px] z-50"
                    onClick={closeModal}
                  >
                    <XCircleIcon className="w-[40px] text-indigo-800" />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
