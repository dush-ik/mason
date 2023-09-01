To deploy any docker images to AWS, follow the steps below.

1. Create the docker image. Always use linux/amd64 architecture to run the docker images if you want to deploy on AWS.
  
       docker run --platform linux/amd64 <image:tag>

2. Create a private repository on [ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html):
Provide the app name then create the repository.
               
       URI:  `{uid}.{region}.amazonaws.com/<appname>`

3. Configure local terminal with AWS configuration.
On AWS start page look for programatic access, get the AWS configuration details from there, i.e., 
*access_key*, *access_secret*, *session_token*. Add these info to local AWS configuration file. 

4. Generate the ECR login token for Docker. Then, pipe that token to docker, so it can push the image to the ECR repository.

       aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin {uid}.{region}.amazonaws.com

5. Tag the docker images with the ECR repository we created earlier, so the docker knows which image to push where.

       docker <appname:tag> {uid}.{region}.amazonaws.com/<appname>

6. Push the image to ECR repository

       docker push {uid}.{region}.amazonaws.com/<appname>

7. Create a Cluster on [ECS](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)
Choose the default VPC and Subnets. 
On Infrastructure part choose [Fargate](https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html).

8. Create ECS task.
Add a task name.
Add container details with repository link 

       {uid}.{region}.amazonaws.com/<appname>:<tag>
   Add container port e.g. 3000 in addition with HTTP 80 Port.
   Set the limit on Task memory and CPU.
   Then create the task.

9. Run the newly created Task.
From the earlier created cluster, click on run task.
Choose the task definition, that was created earlier.
Add a new security group with **custom TCP** which port range has the port in container, e.g. 3000. Also add the source as **Anywhere.**
And hit Run.

10. Public IP will be provided, hit it on browser with the port number. 
`xx.xx.xx.xx:3000`
