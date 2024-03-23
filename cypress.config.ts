import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'f39rdo',
  e2e: {
    baseUrl:"http://localhost:3000",
    env:{
      admin_email:"admin@gmail.com",
      admin_password:"admin123",
      backend_url:"http://localhost:8080/api/v1"
    },
  },
});
