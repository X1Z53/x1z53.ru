import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import undoable, { excludeAction } from "redux-undo"
import { GameActionTypes, HistoryActionTypes } from "store/actions"
import { klondikeReducer } from "store/reducers"

const rootReducer = combineReducers(
  {
    klondike: undoable(klondikeReducer, {
      undoType: GameActionTypes.UndoMove,
      ignoreInitialState: true,
      clearHistoryType: HistoryActionTypes.ClearHistory,
      filter: excludeAction([GameActionTypes.CardIsDragged, GameActionTypes.NewGame])
    }),
  }
)

export type RootState = ReturnType<typeof rootReducer>


export const store = configureStore({
  reducer: rootReducer
})