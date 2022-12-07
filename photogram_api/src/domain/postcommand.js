class PostCommand {
  constructor(url, caption, lat, lng, userId) {
    this.url = url;
    this.caption = caption;
    this.lat = lat;
    this.lng = lng;
    this.userId = userId;
  }

  static fromDto(dto) {
    return new PostCommand(dto.url, dto.caption, dto.lat, dto.lng, dto.userId);
  }
}

module.exports = PostCommand;
