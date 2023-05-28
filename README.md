# TradieConnect README

## About the Project
This repository is for the development of a system for the University of Wollongong, the subject is CSIT314 (Systems Development Methodologies). The system will allow for three types of users. 
1. System Admin: This user can see all customers, all service providers and all requests. They can also view all of these plus additional statistics in a report PDF
2. Customer: A customer can make a new request, review and accept a service provider and review a completed job. They can also generate report data on their account information (payment info), as well as the requests they've made. They can also update personal information 
3. Service Provider: The Service Providers can apply for available jobs (same skill as job and within 50 kilometres of the customer). If they're accepted, the job moves into their current requests. Once completed, the service provider can mark the job as completed. This will allow the customer to review the job and they will receive this review whenever it is completed. The service provider can also generate report PDF data with statistics and information on available, current and past jobs. They too can edit their user information.


## Team:
- Damon O'Neil (Lead Frontend Developer)
- Jesse Surridge (Frontend Developer)
- Brendan Aldrton (Lead Backend Developer)
- Mitchell Griffiths (Team Leader)
- David O'Brien 
- Siddhartha Shah
- Oliver Lambert

## Technology Used
### Frontend
![next](https://img.shields.io/badge/Next-000000?style=for-the-badge&logo=nextdotjs&logoColor=FFFFFF)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![material-ui](https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)
![Node.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

### Backend
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

### UI/UX
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

## Getting Started

### Dependencies
* [Install Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Install Java 17](https://www.oracle.com/au/java/technologies/downloads/)
* [Install Python](https://www.python.org/downloads/)
* [Install Maven](https://www.baeldung.com/install-maven-on-windows-linux-mac)


### Running the Backend & Frontend in Visual Studio Code
<details>
  <summary>Expand Visual Studio Code Instructions</summary>
  
  #### Importing the Project to Visual Studio Code
  * Open Visual Studio Code 
  * Click 'Clone Git Repository'
  ![start_vscode](/Images/start_vscode.png)
  * In the input field, enter 'https://github.com/damonDevelops/Tradie-Connect-Frontend'
  * Click 'Clone from URL'
  ![clone_repo](/Images/clone_repo.png)
  * Select a location on your PC to store the repository folder
  * Open the cloned repository
  * At the bottom right hand side of screen, a dialog box should pop up saying 'This Workspace Has Extension Reccommendations'
  ![extension_suggestions](/Images/extension_suggestions.png)
  
  #### Running the Backend in Visual Studio Code
  * Let the project open in a new window of visual studio code and give it 30 seconds to process
  ![opening_java_projects](/Images/opening_java_projects.png)
  * Once 'loading Java Projects' dialog has completed, navigate to Explorer (top icon of sidebar) > Java Projects > Tradie-Connect-Backend > press the play (triangle) button next to GroupProject
  ![run_backend_java_project](/Images/run_backend_java_project.png)
  
  #### Running the Frontend in Visual Studio Code
  * Run the frontend after the backend has been successfully run
  * Open a new terminal (Terminal > New Terminal) (Ctrl + Shift + `)
  * In the new terminal, enter 'cd frontend'
  
 
</details>

#### Running the Backend in Command Line


### Running the Frontend
#### Running the Frontend in Visual Studio Code
* Open Visual Studio Code 
* Click 'Clone Git Repository'
* In the input field, enter 'https://github.com/damonDevelops/Tradie-Connect-Frontend'
* Click 'Clone from URL'
* Select a location on your PC to store the repository folder
* Open the cloned repository
* In the navbar, click View > New Terminal
* Enter 'cd frontend'
* Enter the command 'npm i'
* Once the terminal has installed all the dependencies (this may take a while), enther the command 'npm run dev'
* Once you see 'eady - started server on 0.0.0.0:3000, url: http://localhost:3000', control click on the link to open it in your respective browser OR
* Open your browser and navigate to the link 'http://localhost:3000'

#### Running the Frontend in Command Line
* Download the zip file from the github page
* Extract the folder to your local machine
* Open the folder in command line (right click > open in Terminal)
* in the command line, enter 'cd frontend'
* run the command 'npm i' (this may take a while, just leave it until it has completed)
* After the packages have installed, run the command 'npm run dev'
* Once you see 'eady - started server on 0.0.0.0:3000, url: http://localhost:3000', control click on the link to open it in your respective browser OR
* Open your browser and navigate to the link 'http://localhost:3000'

## Documentation
To see the documentation visit our [Google Doc](https://docs.google.com/document/d/1PS9mC8sOwt8EZZLfs-ami2DYGCWrlpeQ2m_ioBLnk88/edit#heading=h.sjnh6yl2tkrf)
