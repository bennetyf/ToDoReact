import producer from 'immer';

const defaultTextStyle = {
  fontSize: '1.5rem',
  color: 'cyan'
};

const checkedTextStyle = {
  fontSize: '1.5rem',
  textDecoration: 'line-through',
  fontStyle: 'italic',
  color: 'red'
};

export default {
  namespace: 'todos',

  state:{
    data: [],
    count: 0,
    temp: ''
  },

  reducers:{
    addToDo(state, action){
      return producer(state, (draft)=>{
        draft.count += 1;
        draft.data.push({id: draft.count, content: draft.temp, done: false, style:defaultTextStyle, display:'block'});
        draft.temp = '';
        return draft;
      })
    },

    deleteToDo(state, {payload:id}){
      return producer(state,(draft)=>{
        draft.count -= 1;
        draft.data = draft.data.filter((todo) => (todo.id !== id));
        return draft;
      })
    },

    listAll(state,action){
      return producer(state, (draft)=>{
        draft.data.forEach((todo) => {todo.display = 'block'});
        return draft;
      })
    },

    listCompleted(state, action){
      return producer(state, (draft)=>{
        draft.data.forEach((todo) => {
          if(!todo.done){
            todo.display='none';
          }
          else {todo.display='block'}
        });
        return draft;
      })
    },

    listUncompleted(state, action){
      return producer(state, (draft)=>{
        draft.data.forEach((todo) => {
          if(todo.done){todo.display='none'}
          else {todo.display='block'}
        });
        return draft;
      })
    },

    handleCheck(state,{payload:id}){
      return producer(state, (draft)=>{
        draft.data.forEach((todo) => {
          if (todo.id === id){
            if (todo.done){
              todo.done = false;
              todo.style = defaultTextStyle;}
              else{
                todo.done = true;
                todo.style = checkedTextStyle;
            }
          }});
        return draft;
      })
    },

    handleChange(state, action){
      return producer(state, (draft)=>{
        draft.temp = action.payload;
        return draft;
      })
    }
  }
};
