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
          "libraries": ["-L../lib/windows", "-lACBrCEP64"]
        }],
        ["OS=='linux'", {
          "libraries": ["-L../lib/linux", "-lacbrcep64"]
        }]
      ],
      "cflags": ["-Wall", "-std=c++17", "-D_GLIBCXX_USE_CXX11_ABI=0"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"]
    }
  ]
}
