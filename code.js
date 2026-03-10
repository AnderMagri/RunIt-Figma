figma.showUI(__html__, { width: 420, height: 520, themeColors: true });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'execute') {
    try {
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const fn = new AsyncFunction('figma', msg.code);
      await fn(figma);
      figma.notify("Done");
      figma.ui.postMessage({ type: 'done' });
    } catch (err) {
      figma.notify("Error: " + err.message, { error: true });
      figma.ui.postMessage({ type: 'error', message: err.message });
    }
  }
};
