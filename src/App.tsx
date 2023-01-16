import { Form } from "./components/Form";
import { CommentList } from "./components/CommentList";
import { useForm } from "./hook/useForm";

function App() {
  const {
    formData,
    setFormData,
    onChangeHandler,
    onSubmitHandler,
    initFormData,
    isEdit,
    editId,
    editHandler,
    deleteHandler,
    activePage,
    handlePageChange,
  } = useForm();

  return (
    <>
      <CommentList
        isEdit={isEdit}
        editId={editId}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        activePage={activePage}
        handlePageChange={handlePageChange}
      />
      <Form
        formData={formData}
        setFormData={setFormData}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        initFormData={initFormData}
        isEdit={isEdit}
        editId={editId}
      />
    </>
  );
}

export default App;
