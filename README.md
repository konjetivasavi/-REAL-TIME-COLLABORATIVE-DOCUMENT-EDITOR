Company : CODETECH IT SOLUTIONS

Name : Konjeti Vasavi

INTERN ID : CT04DF720

Duration : 4-WEEKS

Mentor : Neela Santhosh Kumar

Description:To perform a REAL-TIME COLLABORATIVE DOCUMENT EDITOR By Using Frameworks Like React.js

This program is a straightforward example of a **real-time collaborative document editor** built using React and the Socket.IO client library. Essentially, it enables multiple people to work on the same text file at the same time, allowing everyone to see updates as they happen without needing to refresh the page. Let’s go step-by-step to explain what the code is doing and why each part matters.
First, at the very top of the file, the program imports important dependencies. It brings in `useEffect` and `useState` from the React library, which are special hooks that manage the component’s state and side effects. `useState` allows the program to keep track of the document's current text, while `useEffect` lets us control what happens when the component first renders or when other specific updates occur. Next, the program imports `io` from `socket.io-client`. This is what enables our app to communicate in real time with a backend WebSocket server, making the whole collaborative experience possible.

After the imports, the code initializes a socket connection using `const socket = io('http://localhost:4000');`. This single line is crucial because it establishes a persistent connection to a server running at `localhost:4000`. Thanks to this socket connection, the client and the server can send and receive messages at any time without making traditional HTTP requests. This is what allows all connected clients to stay in sync.
Inside the `App` component, the `content` state is defined with `useState('')`. This is the main text of the collaborative document that the user sees and edits. Initially, it’s just an empty string. When the component renders, the `useEffect` hook fires up some socket event listeners. Specifically, it listens for a `load-document` event—which the server emits when a new user first connects—and updates the `content` accordingly. It also listens for `document-updated` events so that whenever someone else edits the document, the changes appear on all clients. This is the heart of real-time collaboration: one client types a character, and all other connected clients instantly see the same thing.

Another important part of this program is the cleanup function returned inside `useEffect`. React will call this function if the component ever unmounts, ensuring that we remove the old event listeners with `socket.off()` to prevent memory leaks or duplicate event handlers.
The `handleChange` function is triggered whenever the user types into the `textarea`. It updates the local `content` state and emits an `update-document` event to the server containing the new content. The server then broadcasts this updated content to every other connected client. This is the real-time magic: what one user types is instantly sent to the backend and then shared with every other user.

Finally, the `App` renders a simple interface containing a `textarea` inside a styled `div`. The `textarea` is bound to the `content` state, so it displays the latest version of the shared document. Every keystroke updates this state and sends data back to the server. The `h1` heading, “📝 Collaborative Document Editor,” simply adds some friendly UI context.
Overall, this program is an elegant, minimalistic example of collaborative, real-time communication built on top of React and Socket.IO. It highlights the power of websockets for creating engaging interactive apps and shows how simple a collaborative editing feature can be when using the right tools. The code structure is clear, with state management handled by React’s hooks and real-time updates powered by a socket connection to the backend. This setup can easily be extended to build even richer collaborative apps like real-time whiteboards, chat rooms, or shared design tools.

