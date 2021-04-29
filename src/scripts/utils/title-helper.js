const TitleHelper = {
  async setTitle(title) {
    document.title = `InstaArt | ${title}`;
  },

  async setDefaultTitle() {
    document.title = 'InstaArt';
  },
};

export default TitleHelper;
