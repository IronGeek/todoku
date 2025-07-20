import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, AppState } from '@/state/store'

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<AppState>();
const useAppStore = useStore.withTypes<AppStore>();

export { useAppDispatch, useAppSelector, useAppStore }
