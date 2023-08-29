const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: '거지방 API docs',
      version: '1.0.0',
      description: '거지방 프로젝트',
    },
    servers: [
      {
        url: 'https://aabnh8if56.ap-northeast-1.awsapprunner.com',
        description: '메인 서버',
      },
    ],
  },
  apis: ['./router/lists.js', './schema/list.js'],
};

export default options;
