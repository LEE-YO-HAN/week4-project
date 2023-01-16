import { Form } from "./components/Form";
import { CommentList } from "./components/CommentList";
import { Pagenation } from "./components/Pagenation";
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
  } = useForm();

  return (
    <>
      <CommentList isEdit={isEdit} editId={editId} editHandler={editHandler} />
      <Pagenation />
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
