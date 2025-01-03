import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'

export const useData = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['todo'],
    queryFn: LocalStorage.getTodoItemsFromLocalStorage,
  });

  return {
    data,
    isLoading,
  };
}

export const useSaveNewTodoItem = () => {
  const client = useQueryClient();

  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: ({ title, priority = 1 }) => {
      const newTodoItem = new TodoItem(new Date().getTime(), title, false, priority);
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem);
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
};

export const useDeleteTodoItem = () => {
  const client = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id) => LocalStorage.deleteTodoItemFromLocalStorage(id),
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
};

export const useToggleTodoItem = () => {
  const client = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: ({ id, isDone }) =>
        LocalStorage.toggleTodoItemInLocalStorage(id, isDone),
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
};
export const useUpdateTodoPriority = () => {
  const client = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: ({ id, priority }) => {
      return LocalStorage.updateTodoPriorityInLocalStorage({ id, priority });
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
};

