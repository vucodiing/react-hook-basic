import React, { useState } from "react";

function TodoForm(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formValue = {
      title: value,
    };
    onSubmit(formValue);
    setValue("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
    </form>
  );
}

export default TodoForm;
