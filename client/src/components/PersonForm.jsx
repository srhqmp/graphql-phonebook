import { useMutation } from "@apollo/client";
import { useState } from "react";

import { ALL_PERSONS, CREATE_PERSON } from "../queries";
import { updateCache } from "../helpers";

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const resetFields = () => {
    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  const [createPerson] = useMutation(CREATE_PERSON, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson);
      resetFields();
    },
    onError: (error) => {
      const messages = error.graphQLErrors
        .map((e) => e.extensions.error.message)
        .join("\n");
      setError(messages);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    createPerson({
      variables: {
        name,
        phone: phone.length > 0 ? phone : undefined,
        street,
        city,
      },
    });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{" "}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{" "}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};

export default PersonForm;
