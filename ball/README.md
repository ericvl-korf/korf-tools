# Ball finder (used by Korf Lab)

`ball960.onnx` is a small ball detector for korfball videos. Korf Lab runs it in your browser, on your own computer, to find the ball in the clips you pick (button **Find the ball in my video**). Your video is never uploaded; only these files are downloaded, once.

- **Model:** [YOLOX](https://github.com/Megvii-BaseDetection/YOLOX) tiny (Apache License 2.0, see `LICENSE-YOLOX.txt`), fine-tuned on korfball frames. Input 960 x 544, one class (ball).
- **Runtime:** [ONNX Runtime Web](https://github.com/microsoft/onnxruntime) 1.22.0 (MIT licence, see `LICENSE-onnxruntime-web.txt`): `ort.wasm.min.js`, `ort-wasm-simd-threaded.mjs`, `ort-wasm-simd-threaded.wasm`.
- **Training data:** frames from the author's own match videos, labelled by hand, plus automatically labelled frames from a second venue.
- **Held-out result:** 95% precision and 98% recall on 51 frames the model never saw (43 with a ball).
