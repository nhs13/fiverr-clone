- express server installation in server.js, app.listen at port 8800
- express server mongodb connection using cluster0 of ,omgodb and putting the uri inside mongoose.connect(), install mongoose
- designing mongodb database structure in mongoose.schema() in a separate folder called "Models" -> create table and define schema
- creating express APIs in routes folder & helper funcions in controllers folder (dont forget to import them),
user express router to make routes, e.g. ```/register``` route is present in ```auth.route.js``` but a middleware is written in server.js
which gives it the prefix ```/api/auth```.
- authentication -> auth routes are register, login and logout -> they each use a controller fn, 
~ in register fn we use bcrypty lib to 
hash the password from req.body and create a new user with all fields from ```req.body``` using the spread operator and the hash pass to 
overwrite the password field, await ```newUser.save()```
~ in login fn, we first retrieve the user from the db, check the entered password against the og db pass using compareSync we use JWT 
to store _id and isSeller info & then render the details of the user except the pass and store the token in cookie
- error handling, craete a middleware instead of writing ```res.status().send()``` in auth file write it here, create a util fn taking status code, 
message as params which returns err w/ these to mw


- login to a node.js server using the React app:
when the form boxes are filled -> setUsername(e.target.value), setPassword(e.target.value)
post {username, password} using axios, axios will send this to the backend's /login route which will inturn call the login controller which 
will auth and return user details with cookie creation (or)
create a util file newRequest where we create:-
    ```axios.create({baseURL: "http://localhost:8800/api", withCredentials: true})```
so it can be used anyhere like:-
    ```const res = await newRequest.post("/auth/login", {username, password})```
- save the user infoin local storage & navigate to the home page on successful login using the useNavigate() hook of the react-router-dom
we can use this currentUser stored in the localstorage to populate our html
- on logout button click use axios to shift to /logout, remove data from localStorage and navigate to homepage


- Creating a new user using node.js and react:
we could have used many state vars for each input field but we can only use ine which was an obj of every input in filling form boxes, 
onChange triggers and we setUser we use spread operator to get all vals of the state var and then overwrite/update them with 
    ```setUser((prev)=>{return {...prev, [e.target.name]: e.target.value}})```
similarly we can handle the checkbox's checking and update the isChecked field of state var


- React image uploading using Cloudinary
we create a handle submit handler which would handle what happens when we submit the form, we create a function in the utils folder "upload"
where we create a data var of type FormData() and append the file and upload_preset, we then post this data var to cloudinary to our folder using axios we take the response we got and store it in a url obj, {url} = res.data, and return this url.
- we post all the form data to /auth/register by spreading out state var and overwrite the img attribute to this url that we recieved 
    ```const url = await upload(file);```
    ```await newRequest.post("/auth/register, {...user, img:url})```
    ```navigate("/")```


- Gig route and controllers 
we create gig route apis using which we will creategigs, deletegigs, getgigs we put a verifyToken middleware between each of these routes, which will check if token exists, isValid and isVerified after that, we will carve out userId, isSeller fromt he payload of the token(which is soterd in cookie) and populate the req parameter and next() ahead.
- We will now reach gig.controller.js where the fucntions reside, createGig and deleteGig check whether the user isSeller and if they are create the gig, await newGig.save() (or)
delete the gig where the gigId is mentioned users can only delete their gigs (check gig.userId === req.userId) then del req.params.id
- getGig using id in params findById in the Gig model
- getGigs here we have implemented filter logic 

we do, ```const gigs = await Gig.find(filters)```
"filters" is an obj which contains whichever condition we have set e.g. ...(q.cat ? {cat: q.cat})
if there is a cat filter enabled add q.cat to the cat attribute of filters object

...(q.userId && {userId: q.userId})
means if query has userId then create an userId object and spread it otherwise the userId obj which replace everything in the filters obj so to just add it as an attribute we use the spread operator 




- React query, using react to send:
We had previously created filters in the gig controller according to which we create a getRequest using React Query in Gigs.jsx which will use axios under the hood and redirect to the API written in the backend w/ query params.
- We will recieve the data and populate the GigCard component with dynamic data from the backend (prev we were using dummy data)
- To use React Query -> yarn add @tanstack react-query we need to wrap out application in App.jsx using QueryClientProvider, (see react-query docx)
- Updating single gis:
In the gigCard component we Link it to '/gig/${item._id}' so id goes as a parameter in the url, which is received on the gig page useParams()
new get request is fixed from gig page using React Query to the API that renders a single gig page data, this data is used to populate the gig page similar react query is written to get the user info of the owner of that gig.



- React Review (rating) system
So each gig contains a review component, here all reviews are rendered, the <Reviews/> takes the gig's id as prop uses this if to get reviews from the db adn for each review renders a <Review/> component which takes reviewID as prop which in turn renders the review, the <Reviews/> component comtais a form which allows buyers to add reviews and give ratings, Gig page fetched "stars" ratings from the db in real time and updates the current raitng of the seller using the useMutation hook as soon as another review is added. 



Message.jsx
- written messages are being uploaded to the database using the ```createMessage``` API endpoint
- we then check if this conversation already exists using ```conversationId```
- if yes, we update the ```readBy``` and ```lastMessage``` attributes
- we get all the messages using react query from the ```getMessages``` API endpoint using the ```conversationId```
- we render all the messages using a map function



Messages.jsx
- p1 sends msg to p2 -> this is one convo
- whoever is currently logged in is the current user and their details 
are stored in the local storage
- we retrieve all the conversations from the db, and we render only the
ones which involve the current user into the table using map
- moment lib is used to write stuff like how long ago was this msg sent
- intially whoever sends the msg (buyer or seller) the msg becomes read
for that person, if the msg is unread then it will be green w mark as read button available, clicking on which will make the green color go away denoting that this msg is read
- onclick of the mark as read button, a function is called with the conversation id as the argument, this function uses useMutation hook to then update the database (change the status of the conversation to read) and invalidate the queries (refetch them), we need the id of the conversation to pass in the api call of useMutation because the route on the backend accept a route w id passed as parameter in the url which is then used to find and update the particular entry in the db table




MyGigs.jsx
- here we are getting the id of the user which is currently 
logged in from the local storage
- then we are getting all the gigs of this particular user from
the database using react-query and axios
- we are then populating the html with these gigs in a table
- we have a delete button on clicking which the particular gig 
assigned to it (using map and iterating we already know this)
will get deleted using the useMutation hook -> useMutation fn 
calls the api endpoint responsible for deleting a gig from the db
and then invalidates the queries to run a refetch w the updated db



Orders.jsx
- in this page we are rendering all the orders the currently 
logged in user is involved in, w the ids of people who are on the other side of the order, the particular gig for which the order is made and the price of the gig and a contact btn
- so there is an img (button) which when clicked will lead to 
a conversation with the seller/buyer involved in that order
- on button click if this particular convo exists already, if 
it does navigate the user to that direct message page, else
create a conversation and then navigate the user



Gig Form and useReducer
// when you handle multiple states in a single fn -> useReducer  
// when 2 or more states change together it is better to use useReducer hook
- we use the useReducer hook to create and update states which store the info about the gig when the gig form is typed in