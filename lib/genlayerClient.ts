export class GenLayerClient {
  async action(contract: string, action: string, args: any) {
    const res = await fetch("https://api.genlayer.com/v1/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contract,
        action,
        args
      })
    });

    if (!res.ok) {
      throw new Error("GenLayer action failed");
    }

    return res.json();
  }

  async view(contract: string, view: string, args: any) {
    const res = await fetch("https://api.genlayer.com/v1/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contract,
        view,
        args
      })
    });

    if (!res.ok) {
      throw new Error("GenLayer view failed");
    }

    return res.json();
  }
}
