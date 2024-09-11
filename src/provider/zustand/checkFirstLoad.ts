import {create} from 'zustand';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

interface checkState {
  isFirstLoad: boolean;
  setFirstLoade: (status: boolean) => void;
}

const useCheckFirstLoad = create<checkState>(set => ({
  isFirstLoad: storage.getBoolean('isFirstLoad') ?? true,
  setFirstLoade(status) {
    storage.set('isFirstLoad', status);
    set({isFirstLoad: status});
  },
}));

export default useCheckFirstLoad;
