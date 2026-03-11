figma.showUI(__html__, { width: 420, height: 520, themeColors: true });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'execute') {
    try {
      let code = msg.code;

      // Unwrap if code is wrapped in an async function declaration
      const funcWrap = code.match(/^(?:async\s+)?function\s+\w*\s*\([^)]*\)\s*\{([\s\S]*)\}\s*$/);
      if (funcWrap) {
        code = funcWrap[1].trim();
      }

      // Strip import/export statements that aren't allowed in the sandbox
      code = code.replace(/^\s*(import|export)\s+.*/gm, '');

      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const fn = new AsyncFunction('figma', code);
      await fn(figma);
      figma.notify("Done");
      figma.ui.postMessage({ type: 'done' });
    } catch (err) {
      figma.notify("Error: " + err.message, { error: true });
      figma.ui.postMessage({ type: 'error', message: err.message });
    }
  }
};
