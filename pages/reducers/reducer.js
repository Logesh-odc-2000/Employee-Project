import actiontype from "../actions/actiontype";

const init = {
  people: [],
};

export default function Reducer(state = init, action) {
  console.log(action);

  switch (action.type) {
    case actiontype.SAVE: {
      return { ...state, people: [...state.people, action.payload] };
    }

    case actiontype.DELETE: {
      console.log(action.payload);
      const newPeople = state.people.filter(
        (ppl) => ppl.id !== action.payload.id
      );
      console.log(newPeople);
      return { ...state, people: newPeople };
    }

    case actiontype.EDIT: {
    
      const updatedPeople = state.people.map(person => {
        if (person.id === action.payload.id) {
          return {
            ...person,
            name: action.payload.values.name,
            dob: action.payload.values.dob,
            email: action.payload.values.email,
            salary: action.payload.values.salary,
            height: action.payload.values.height,
          };
        }
        return person;
      });
      return {
        ...state,
        people:  updatedPeople
      };
    }

    case actiontype.MOVE_TO_PAGE: {
      return {
        ...state,
        activePage: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
