import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
  name: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = props => {
  const [item, setItem] = useState(initialItem);

  useEffect(() => {
    const id = props.match.params.id;
    console.log(props.movie);
    const movieToEdit = props.movie.find(i => `${i.id}` === id);
    if (movieToEdit) {
      setItem(movieToEdit);
    }
  }, [props.movie, props.match.params.id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${item.id}`, item)
      .then(res => {
        const updatedList = props.movie.map(v => {
          if (v.id === item.id) {
            return (v = res.data);
          } else {
            return v;
          }
        });
        props.setMovie(updatedList);

        props.history.push(`/movies/${item.id}`);
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={item.stars}
        />
        <div className="baseline" />

        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
