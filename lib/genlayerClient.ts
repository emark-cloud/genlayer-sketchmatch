export class GenLayerClient {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async action(contract: string, action: string, args: any) {
    const res = await fetch("https://api.genlayer.com/v1/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
      },
      body: JSON.stringify({
        contract,
        action,
        args,
      }),
    });

    return await res.json();
  }

  async view(contract: string, view: string, args: any) {
    const res = await fetch("https://api.genlayer.com/v1/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
      },
      body: JSON.stringify({
        contract,
        view,
        args,
      }),
    });

    return await res.json();
  }
}
