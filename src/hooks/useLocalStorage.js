import { useState } from "react";

export const useLocalStorage = (key = '', initialValue = '') => {
    const [state, setState] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    const setLocalStorageState = (newState) => {
        try {
            const newStateValue = typeof newState === 'function' ? newState(state) : newState;
            window.localStorage.setItem(key, JSON.stringify(newStateValue))
            setState(newStateValue);
        } catch (error) {
            console.log('cannot set new key to local state', error);
        }
    };
    return [state, setLocalStorageState];

}

// const [state, setState]

// setState('aaadawd')
// setState(prev => {})