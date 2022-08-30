import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(old => [...old, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }]);
  }

  function handleToggleTaskDone(id: number) {
    const data = tasks.map(t => t);
    const FindTaks = data.find(f => f.id == id);

    if (!FindTaks) return

    FindTaks.done = !FindTaks.done;

    setTasks(data);

  }

  function handleRemoveTask(id: number) {
    setTasks(old => old.filter(f => f.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})