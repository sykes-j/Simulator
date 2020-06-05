import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum ExecutionStatus {
  RUNNING,
  STOPPED,
  PAUSED,
}

/**
 * Reducer responsible for the execution of the JS
 */
export const vmSlice = createSlice({
  name: "vm",
  initialState: {
    code: null as string | null,
    status: ExecutionStatus.STOPPED,
  },
  reducers: {
    startExecution(state) {
      if (state.code) {
        state.status = ExecutionStatus.RUNNING;
      }

      return state;
    },
    stopExecution(state) {
      state.status = ExecutionStatus.STOPPED;

      return state;
    },
    step(state) {
      return state;
    },
    setCode(state, action: PayloadAction<{ code: string }>) {
      state.code = action.payload.code;
      return state;
    },
  },
});

export const getExecutionStatus = (state: RootState) => state.vm.status;

/**
 * Returns whether the interpreter has been started or not.
 *
 * @param state the root state of the application
 *
 * @returns true if the interpreter is started, false otherwise.
 */
export const isExecuting = (state: RootState) =>
  state.vm.status !== ExecutionStatus.STOPPED;
