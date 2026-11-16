module.exports = {
  daemon: true,
  run: [{
    method: "shell.run",
    params: {
      path: "app",
      env: {
        SD_WEBUI_RESTARTING: 1,          // Forge does not open a browser of its own: Pinokio opens it
        TOKENIZERS_PARALLELISM: "false"
      },
      // the project's own environment (its git, uv, ffmpeg, llama.cpp first on PATH), then its launch options (--api);
      // the port is passed because several tabs call the server at its own port
      message: "call installer\\env.bat && cd forge\\webui && webui-user.bat --port {{port}}",
      on: [{
        event: "/(http:\\/\\/[0-9.:]+)/",
        done: true
      }]
    }
  }, {
    method: "local.set",
    params: {
      url: "{{input.event[1]}}"
    }
  }]
}
