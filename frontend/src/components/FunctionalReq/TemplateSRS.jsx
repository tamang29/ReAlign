export const predefinedContent = `
<h2>1. Introduction</h2>
<h3>1.1 Purpose</h3>
<p>The purpose of this document is to provide a comprehensive example of a Software Requirements Specification (SRS) for a simple application designed to manage the requirements of software and system products. This document follows the ISO/IEC/IEEE 29148:2018 standard, which provides guidelines for developing and documenting software requirements. By outlining the functional and non-functional requirements, this SRS aims to serve as a blueprint for the development team and stakeholders, ensuring a clear and common understanding of the project objectives and deliverables.</p>
<h3>1.2 Scope</h3>
<p>The scope of this document is to outline the requirements for a requirements management application intended for software and system products. This application will facilitate the documentation, tracking, and management of requirements throughout the product lifecycle. The scope includes defining the functionalities, user interactions, performance criteria, and external interfaces. However, it does not cover detailed design specifications, implementation details, or maintenance procedures, which are beyond the scope of this SRS.</p>
<h3>1.3 Product Perspective</h3>
<p>This requirements management application is envisioned as a standalone product that integrates seamlessly with existing project management and development tools within an organization's IT ecosystem. It will function as a centralized repository for all project requirements, providing interfaces for data exchange with other systems such as version control systems, continuous integration tools, and project management software. This integration ensures that requirements are consistently tracked and managed across all stages of the development process, enhancing collaboration and efficiency.</p>
<h3>1.4 Product Functions</h3>
<p>The main functions of the requirements management application include creating, editing, and deleting requirements; categorizing and prioritizing requirements; and tracking their status throughout the project lifecycle. Additionally, the application will support collaboration features such as commenting, attaching files, and linking related requirements. It will also provide reporting and analytics tools to help stakeholders monitor progress and identify potential issues early in the development process.</p>
<h3>1.5 User Characteristics</h3>
<p>The intended users of this application include project managers, business analysts, developers, testers, and other stakeholders involved in the software development process. Users are expected to have varying levels of technical expertise, from non-technical stakeholders who need to review and approve requirements to technical users who need to manage and implement them. The application will be designed with a user-friendly interface to accommodate this diverse user base, ensuring that all users can efficiently interact with the system.</p>
<h3>1.6 Limitations</h3>
<p>The requirements management application will have certain limitations due to technological, operational, and regulatory constraints. For instance, the application may not support integration with all existing tools used by different organizations, and there might be limitations in terms of scalability when handling extremely large projects. Additionally, the application must comply with relevant data protection regulations, which might restrict certain functionalities or require specific data handling practices.</p>
<h3>1.7 Assumptions and Dependencies</h3>
<p>Several assumptions and dependencies underpin the development of this application. It is assumed that users will have access to a modern web browser and a stable internet connection, as the application will be web-based. Dependencies include integration with third-party tools such as version control systems and project management software, which requires those systems to provide compatible APIs. Additionally, the project assumes that necessary resources, including development and testing environments, will be available.</p>
<h3>1.8 Definitions</h3>
<p>This section provides definitions for terms used throughout the document to ensure a common understanding among all stakeholders. Terms such as "requirement," "stakeholder," "use case," and "functional requirement" will be clearly defined. By establishing precise definitions, this section helps prevent misunderstandings and ensures that all parties have a shared vocabulary when discussing the project's requirements and functionalities.</p>
<h3>1.9 Acronyms and Abbreviations</h3>
<p>To facilitate readability and comprehension, this section lists all acronyms and abbreviations used in the document, along with their full forms. Examples include SRS (Software Requirements Specification), API (Application Programming Interface), and GUI (Graphical User Interface). Providing this list ensures that readers can easily reference and understand abbreviated terms, enhancing clarity and communication.</p>
<h2>2. Requirements</h2>
<h3>2.1 External Interfaces</h3>
<p>This section describes the external interfaces that the application will interact with, including user interfaces, APIs, and hardware interfaces. It details the methods and protocols for data exchange with external systems, ensuring seamless integration and data flow. By clearly defining these interfaces, this section ensures that the application can communicate effectively with other tools and systems in the development environment, facilitating interoperability and efficiency.</p>
<h3>2.2 Functions</h3>
<p>The functional requirements section details all the functionalities the application must provide. It includes use cases, user stories, and specific functional requirements that describe the interactions between users and the system. Each function is described in terms of inputs, processes, and expected outputs, ensuring that all stakeholders have a clear understanding of what the system will do and how it will behave under various conditions.</p>
<h3>2.3 Usability Requirements</h3>
<p>Usability requirements outline the criteria for the application's user interface and overall user experience. This section specifies design principles, accessibility standards, and usability metrics that the application must meet to ensure it is user-friendly and accessible to all intended users. It also includes guidelines for interface layout, navigation, and interaction design, aimed at providing an intuitive and efficient user experience.</p>
<h3>2.4 Performance Requirements</h3>
<p>This section specifies the performance criteria that the application must meet, including response time, throughput, and resource utilization. It sets benchmarks for how quickly the system should respond to user inputs, how many transactions it can handle simultaneously, and how efficiently it uses system resources. By defining these metrics, this section ensures that the application performs reliably and efficiently under expected usage conditions.</p>
<h3>2.5 Logical Database Requirements</h3>
<p>Logical database requirements detail the data structures and database design necessary to support the application's functionalities. This section includes the types of data to be stored, relationships between data entities, and data integrity constraints. By providing a clear logical model, this section ensures that the database design aligns with the application's functional requirements and supports efficient data management and retrieval.</p>
<h3>2.6 Design Constraints</h3>
<p>Design constraints outline the limitations and restrictions that must be considered during the application's design phase. These constraints may include adherence to specific design standards, compatibility with existing systems, and restrictions imposed by hardware or software environments. By clearly stating these constraints, this section guides the design process and ensures that the application can be implemented within the given parameters.</p>
<h3>2.7 Standards Compliance</h3>
<p>This section specifies the standards and regulatory requirements with which the application must comply. It includes industry standards, legal regulations, and organizational policies that the application must adhere to. By ensuring compliance with these standards, this section helps mitigate risks and ensures that the application meets all necessary legal and operational requirements.</p>
<h3>2.8 Software System Attributes</h3>
<p>Software system attributes describe the non-functional requirements of the application, such as security, maintainability, portability, and reliability. This section outlines the criteria for these attributes, ensuring that the application not only meets its functional requirements but also performs well in terms of security, ease of maintenance, and adaptability to different environments. These attributes are crucial for the long-term success and sustainability of the application.</p>
<h2>3. Verification</h2>
<p>The verification section describes the process and methods used to ensure that the application meets its specified requirements. It includes testing strategies, validation activities, and acceptance criteria. This section outlines how each requirement will be verified, detailing the tests to be performed, the expected results, and the criteria for acceptance. By providing a clear verification plan, this section ensures that the application is thoroughly tested and validated before deployment.</p>
<h2>4. Supporting Information</h2>
<p>Supporting information includes additional materials that aid in understanding and developing the application. This section may contain diagrams, appendices, glossaries, and any other relevant documents or data. These supplementary materials provide context, detailed explanations, and visual representations that support the main content of the SRS, enhancing comprehension and aiding in the development process.</p>
<h2>5. References</h2>
<p>The references section lists all the documents, standards, and resources cited in the SRS. This includes technical documents, industry standards, research papers, and any other sources referenced throughout the document. Providing a comprehensive list of references ensures that readers can verify information, consult original sources, and understand the basis for the requirements and guidelines specified in the SRS.</p>
<h2>Revision History</h2>
<p>The revision history section tracks changes made to the document over time. It includes a table with version numbers, dates, descriptions of changes, and the authors of each revision. This section provides a clear record of the document's evolution, ensuring transparency and facilitating version control. By maintaining a detailed revision history, stakeholders can track the progress of the document and understand the rationale behind changes.</p>
`;