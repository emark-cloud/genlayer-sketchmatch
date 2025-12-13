"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [providerAvailable, setProviderAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect MetaMask or any EIP-1193 wallet
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setProviderAvailable(true);

      // Auto-load accounts if connected previously
      window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  async function connect() {
    if (!window.ethereum) {
      setError("No wallet detected. Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet.");
    }
  }

  function disconnect() {
    setAccount(null);
  }

  return {
    account,
    providerAvailable,
    error,
    connect,
    disconnect,
  };
}
