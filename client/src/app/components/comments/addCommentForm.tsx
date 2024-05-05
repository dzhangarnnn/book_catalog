import React, { useEffect, useState } from "react";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../utils/validator";

interface Props {
  onSubmit: (data: { content: string }) => void;
}

const AddCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<{ content: string }>({ content: "" });
  const [errors, setErrors] = useState<{ content?: string }>({});

  useEffect(() => {
    if (data.content) {
      setErrors({});
    }
  }, [data.content]);

  const handleChange = (target: { name: string; value: string }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfig = {
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({ content: "" });
    setErrors({});
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h4>Новый отзыв</h4>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.content}
          onChange={handleChange}
          name="content"
          label="Сообщение"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Опубликовать</button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentForm;
