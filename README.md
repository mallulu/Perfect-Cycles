<a name="readme-top"></a>

# Perfect-Cycles
Git repository for the Alraedah assessment.

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
       <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#running-the-project">Running the Project</a></li>
      </ul>
    </li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#part-two-increased-json-size">Part Two</a></li>
  </ol>
</details>

### Built With

* [Node.js](https://github.com/nodejs/node),
* [Jest](https://github.com/facebook/jest) for code testing,
* [Formidable](https://github.com/node-formidable/formidable) for easier manipulation of uploaded files and form data


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
### Running the project:

1. Clone the repo
   ```sh
   git clone https://github.com/mallulu/Perfect-Cycles.git
   ```
2. Navigate to the newly created local repository folder
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the following command:
   ```sh
   npm start
   ```
> NOTE: The server will run locally on port 8080

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TESTING -->
## Testing
To run the test suite, execute the following command while in the project directory:
```sh
npm test
```

The test suite covers the Cycler.js file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PART TWO -->
## Part Two: Increased JSON Size
In the case of a larger JSON file that would be too big for a normal API call, I propose the following strategy:
* A "client" application would read a large json file, and:
  1. Parse the json to one string,
  2. Divide the string into multiple segments whose sizes would be optimized freely based on server/network capabilites,
  3. Encapsulate each of the segments in an object that would include the segment string, and segment metadata (such as segment number in the sequence of segments),
  4. Inform the server-side "consumer" of the number of messages/segments it should expect to receive,
  5. Send each segment separately to the server-side "consumer",
* Additionally, could utilize an end of line character to inform the server that message delivery is finished
* Then, server-side, the different segments would be combined (given that they were all received; refer to step 4) based on their positions (as assigned in their metadata), and finally, computation would be performed on the final, combined json.
* Sending the response back to the "client" application would follow the same steps as 1 to 5.

Alternatively, the following strategy could be followed: 
* Divide the json into multiple arrays, and send each array individually. This would have advantages such as:
  1. Each sent array is self-contained; it does not need to wait for other fragments of itself to be properly handled: it is the only fragment of itself,
  2. This opens up the ability to process each array separately while waiting for the other arrays to be sent in,
  3. This approach would be much more fault-tolerant, as one message failing does not halt the entire process; the received arrays are still processed successfully, regardless of lost messages/arrays,
* This approach, however, would still have the issue of a too-large request if one of the arrays is, by itself, too large.

With regards to message queueing, if for instance using Apache Kafka, there would be the following:
* A topic that houses the Request segments/arrays,
* A topic that houses the Response segments/arrays,
* A producer on the "client" side that would send the *unprocessed* segments/arrays to the Request topic,
* A consumer on the "server" side that would consume the *unprocessed* segments/arrays from the Request topic,
* A producer on the "server" side that would send the *processed* segments/arrays to the Request topic,
* A consumer on the "client" side that would consume the *processed* segments/arrays from the Request topic,

<p align="right">(<a href="#readme-top">back to top</a>)</p>

