/**
 * Create initial state
 * Write reducer function
 * Create Redux store
 * Dispatch Action
 * Subscribe to store
 * Render UI
 **/

// DOM elements
const counterEl = document.getElementById("counter");
const addCounterEl = document.getElementById("add-counter");
const resetEl = document.getElementById("reset");
const root = document.getElementById("root");

// initial state
const initialState = [
  {
    id: 0,
    value: 0,
    incrementBy: 2,
    decrementBy: 1,
  },
];

// Global action variables
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";
const NEWCOUNTER = "newcounter";

// id generator
const idGenerator = (state) => {
  const newID = state.reduce((previousValue, currentValue) => {
    return Math.max(previousValue, currentValue.id);
  }, 0);

  return newID + 1;
};

// Action creators
const incrementorAction = (counterId, counterValue) => {
  return {
    type: INCREMENT,
    payload: {
      id: counterId,
      value: counterValue,
    },
  };
};

const decrementorAction = (counterId, counterValue) => {
  return {
    type: DECREMENT,
    payload: {
      id: counterId,
      value: counterValue,
    },
  };
};

const newCounterAction = () => {
  return {
    type: NEWCOUNTER,
  };
};

const resetCounterAction = () => {
  return {
    type: RESET,
  };
};

// reducer function
const counterReducer = (state = initialState, action) => {
  if (action.type === NEWCOUNTER) {
    return [
      ...state,
      {
        id: idGenerator(state),
        value: 0,
        incrementBy: Math.floor(Math.random() * 10) + 1,
        decrementBy: Math.floor(Math.random() * 10) + 1,
      },
    ];
  }

  if (action.type === RESET) {
    return state.map((item) => ({
      ...item,
      value: 0,
    }));
  }

  if (action.type === INCREMENT) {
    const { id, value } = action.payload;
    return state.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          value: item.value + value,
        };
      } else {
        return {
          ...item,
        };
      }
    });
  }

  if (action.type === DECREMENT) {
    const { id, value } = action.payload;
    return state.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          value: item.value - value,
        };
      } else {
        return {
          ...item,
        };
      }
    });
  }

  return state;
};

// Create Redux Store
const store = Redux.createStore(counterReducer);

// render function
const render = () => {
  const state = store.getState();

  let counterCard = "";

  state.forEach((item) => {
    counterCard += `
        <div
        class="p-4 h-auto flex flex-col items-center justify-center space-y-5 mb-2 bg-white rounded shadow"
      >
        <div class="text-2xl font-semibold" id="counter">${item.value}</div>
        <div class="flex space-x-3">
          <button
            class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
            id="increment"
            onclick="store.dispatch(
              incrementorAction(${item.id}, ${item.incrementBy})
            );"
          >
            Increment
          </button>
          <button
            class="bg-red-400 text-white px-3 py-2 rounded shadow"
            id="decrement"
            onclick="store.dispatch(
              decrementorAction(${item.id}, ${item.decrementBy})
            );"
          >
            Decrement
          </button>
        </div>
      </div>
    `;
  });

  root.innerHTML = counterCard;
};

render();

// subscribe to store
store.subscribe(render);

// event listeners
addCounterEl.addEventListener("click", () => {
  store.dispatch(newCounterAction());
});

resetEl.addEventListener("click", () => {
  store.dispatch(resetCounterAction());
});
