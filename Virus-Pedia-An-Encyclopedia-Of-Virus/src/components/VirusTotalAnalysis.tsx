import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { toast } from "sonner";

export function VirusTotalAnalysis() {
  const [fileHash, setFileHash] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_VIRUSTOTAL_API_KEY;

  const openVTPage = (path: string) => {
    window.open(`https://www.virustotal.com/gui/${path}`, "_blank");
  };

  const safeJson = async (resp: Response) => {
    try {
      return await resp.json();
    } catch {
      return null;
    }
  };

  // ---------- HASH SCAN ----------
  const handleHashSearch = async () => {
    setAnalysis(null);
    if (!fileHash) {
      toast.error("Please enter a valid hash (MD5/SHA256)");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(
        `https://www.virustotal.com/api/v3/files/${encodeURIComponent(fileHash)}`,
        {
          headers: { "x-apikey": API_KEY, Accept: "application/json" },
        }
      );
      const data = await safeJson(resp);
      if (resp.ok && data?.data?.attributes?.last_analysis_results) {
        setAnalysis(data);
        toast.success("Hash analysis fetched successfully");
      } else {
        toast.error("Hash lookup failed. Opening VirusTotal.");
        openVTPage(`file/${fileHash}/detection`);
      }
    } catch (err) {
      console.error("Hash lookup error:", err);
      toast.error("Network or CORS issue, opening VirusTotal.");
      openVTPage(`file/${fileHash}/detection`);
    } finally {
      setLoading(false);
    }
  };

  // ---------- FILE UPLOAD ----------
  const handleFileUpload = async () => {
    setAnalysis(null);
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const resp = await fetch("https://www.virustotal.com/api/v3/files", {
        method: "POST",
        headers: { "x-apikey": API_KEY },
        body: formData,
      });
      const data = await safeJson(resp);

      if (resp.ok && data?.data?.id) {
        // Fetch final analysis
        const analysisId = data.data.id;
        const reportResp = await fetch(
          `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
          { headers: { "x-apikey": API_KEY } }
        );
        const reportData = await safeJson(reportResp);
        setAnalysis(reportData);
        toast.success("File analyzed successfully");
      } else {
        toast.error("Upload failed. Opening VirusTotal upload page.");
        openVTPage("home/upload");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed (CORS/network).");
      openVTPage("home/upload");
    } finally {
      setLoading(false);
    }
  };

  // ---------- URL SCAN ----------
  const handleUrlScan = async () => {
    setAnalysis(null);
    if (!fileHash.startsWith("http")) {
      toast.error("Please enter a valid URL (http/https)");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch("https://www.virustotal.com/api/v3/urls", {
        method: "POST",
        headers: {
          "x-apikey": API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `url=${encodeURIComponent(fileHash)}`,
      });
      const data = await safeJson(resp);

      if (resp.ok && data?.data?.id) {
        const analysisId = data.data.id;
        const report = await fetch(
          `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
          { headers: { "x-apikey": API_KEY } }
        );
        const reportData = await safeJson(report);
        setAnalysis(reportData);
        toast.success("URL analyzed successfully");
      } else {
        toast.error("URL analysis failed. Opening VirusTotal.");
        openVTPage("home/url");
      }
    } catch (err) {
      console.error("URL analysis error:", err);
      toast.error("Network/CORS issue — opening VirusTotal.");
      openVTPage("home/url");
    } finally {
      setLoading(false);
    }
  };

// ---------- RENDER ANALYSIS TABLE ----------
const renderResultsTable = () => {
  // VirusTotal analysis results location:
  const results =
    analysis?.data?.attributes?.last_analysis_results ||
    analysis?.data?.attributes?.results ||
    analysis?.attributes?.last_analysis_results;

  if (!results) return null;

  const entries = Object.entries(results);

  return (
    <div className="overflow-auto max-h-[600px] mt-4">
      <table className="min-w-full text-sm border border-gray-700 rounded-lg">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            <th className="p-2 text-left">Engine</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Result</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 text-gray-100">
          {entries.map(([engine, data]: any, i) => (
            <tr
              key={i}
              className={`border-t border-gray-700 ${
                data.category === "malicious" ? "bg-red-900/40" : ""
              }`}
            >
              <td className="p-2">{engine}</td>
              <td className="p-2 capitalize">{data.category}</td>
              <td className="p-2">
                {data.category === "malicious" ? (
                  <span className="text-red-400 font-semibold">
                    ⚠️ {data.result || "Malicious"}
                  </span>
                ) : (
                  <span className="text-green-400">✅ Clean</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>VirusTotal Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* --- Hash or URL Input --- */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter file hash or URL"
              value={fileHash}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFileHash(e.target.value.trim())
              }
            />
            <Button onClick={handleHashSearch} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Hash"}
            </Button>
            <Button variant="outline" onClick={handleUrlScan} disabled={loading}>
              {loading ? "Scanning..." : "Analyze URL"}
            </Button>
          </div>

          {/* --- File Upload --- */}
          <div className="mt-4 flex gap-2 items-center">
            <input
              id="vt-file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border rounded-lg p-2"
            />
            <Button onClick={handleFileUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload & Analyze"}
            </Button>
            <Button
              variant="outline"
              onClick={() => openVTPage("home/upload")}
            >
              Manual upload on VirusTotal
            </Button>
          </div>

          {/* --- Result Display --- */}
          {analysis && renderResultsTable()}
        </CardContent>
      </Card>
    </div>
  );
}

export default VirusTotalAnalysis;
