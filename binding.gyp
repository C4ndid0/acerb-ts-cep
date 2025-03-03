{
  "targets": [
    {
      "target_name": "acbr_cep",
      "sources": ["src/native/acbr_cep.cc"],
      "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")"],
      "libraries": [],
      "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],
      "conditions": [
        ["OS=='win'", {
          "libraries": ["-l../lib/windows/ACBrCEP64"]
        }],
        ["OS=='linux'", {
          "libraries": ["-l../lib/linux/acbrcep64"]
        }]
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"]
    }
  ]
}