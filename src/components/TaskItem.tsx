import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface TaskItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({
  index, item, toggleTaskDone, removeTask, editTask
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEditing, setTitleEditing] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {

    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTitleEditing(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {//taskId: number, taskNewTitle: string
    editTask(item.id, titleEditing);
    setIsEditing(false);
  }

  useEffect(() => {
    textInputRef.current && isEditing
      ? textInputRef.current?.focus()
      : textInputRef.current?.blur();
  }, [isEditing])
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={titleEditing}
            onChangeText={setTitleEditing}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
          {/* {item.title} */}

        </TouchableOpacity>
      </View>
      <View style={{
        flexDirection: "row",

      }}>
        {isEditing ?
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <Icon name="edit" size={20} color="#b2b2b2" />
          </TouchableOpacity>
        }
        <View style={{ width: 2, backgroundColor: "rgba(196, 196, 196, 0.24)" }} />
        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  containerButton: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center'
  }
})