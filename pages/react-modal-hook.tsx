import ReactModal from "react-modal";
import { useState, useContext } from "react";
import { useModal, ModalProvider } from "react-modal-hook";
import { UserCount } from "./index";

// アプリのルートを識別するクエリセレクタを指定する。
ReactModal.setAppElement("#__next");

const App = () => {
  const { usecount, setuseCount: number } = useContext(UserCount);

  const [showModal, hideModal] = useModal(
    () => (
      <>
        <ReactModal isOpen>
          <p>Modal content</p>
          <button onClick={hideModal}>Hide modal</button>
          <span>The count is {usecount}</span>
          <button onClick={() => setuseCount(usecount + 1)}>Increment</button>
        </ReactModal>
      </>
    ),
    [usecount]
  );

  return <button onClick={showModal}>Show modal</button>;
};

const Hoge = () => {
  return (
    <ModalProvider>
      <App />
    </ModalProvider>
  );
};

export default Hoge;
