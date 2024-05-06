=> Using rtk 

S1 : Install rtk

S2: Create a store using configureStore fn

S3: Define an intial state

S4: Create slices under the features dir using createSlice({}), with name, intialState and reducers(which themselves contain properties and fns) as attributes.

S5: Define the reducers, add functionality into them to be used later.

S6: Export the slice, export the reducers indivisually as well as export the reducers as set.

S7: Import the reducer set in store.js, register this set in the store using configure store function.

S8: Create a form to submit a todo, which upon submit utilizes the useDispatch() fn (which in turn uses a reducer to make changes in the store) and adds the todo in the store.

S9: Import Provider form rtk and store from the file we made the store in and wrap React with Provider and provide value as store in Main.jsx or in App.jsx.



NOTE : the payload contains just whatever is passed in the argument e.g. in removeTodo(id), only id is passed in the argument so payload will contain only the id.















