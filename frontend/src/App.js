
import { useState,useEffect } from 'react';
import Task from './component/Task';
import { 
  Flex,
  Center,
  Box,
  CheckboxGroup,
  Text,
  Input,
  Button,
} from "@chakra-ui/react"
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetch = async() => {
    const res = await axios.get("http://localhost:3010/tasks");
    setTasks(res.data);
  };

  const createTask = async() => {
    await axios.post("http://localhost:3010/tasks", {
      title: title,
      isDone: false,
    });
    fetch();
    setTitle("");
  }

  const destroyTask = async(id) => {
    await axios.delete(`http://localhost:3010/tasks/${id}`);
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  const toggleIsDone = async(id,index) => {
    const isDone = tasks[index].isDone;
    await axios.put(`http://localhost:3010/tasks/${tasks[index].id}`, {
      isDone: !isDone,
    });
    fetch();
  };

  return (
    <Box mt="64px">
      <Center>
        <Box>
        <Box mb="24px">
          <Text fontSize="24px" fontWeight="bold">
            タスク一覧
          </Text>
          </Box>
          <Flex mb="24px">
            <Input
              placeholder="タスクを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Box ml="16px">
              <Button colorScheme="teal" onClick={createTask}>
                タスクを追加
              </Button>
            </Box>
          </Flex>
          <CheckboxGroup>
            {tasks.map((task,index) => {
              return(
                <Task
                id={task.id}
                key={index}
                index={index}
                title={task.title}
                isDone={task.isDone}
                toggleIsDone={toggleIsDone}
                destroyTask={destroyTask}
                />
                )
             })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
    );
  }

export default App;
