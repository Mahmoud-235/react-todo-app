export default function TodosReducer(currentState, action) {
  switch (action.type) {
    // ================= ADD =================
    case "added": {
      if (action.payload.valueInpu.trim() === "") {
        return currentState;
      }

      const list = {
        id: Date.now(),
        name: action.payload.valueInpu,
        isdone: false,
      };

      return [...currentState, list];
    }

    // ================= DELETE =================
    case "deleted": {
      return currentState.filter((item) => item.id !== action.payload.id);
    }

    // ================= EDIT =================
    case "edited": {
      return currentState.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              name: action.payload.title,
              details: action.payload.details,
            }
          : item,
      );
    }

    // ================= TOGGLE =================
    case "toggle": {
      return currentState.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              isdone: !item.isdone,
            }
          : item,
      );
    }

    // ================= DEFAULT =================
    default:
      return currentState;
  }
}
