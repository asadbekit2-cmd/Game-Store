"use client";

import { Button } from "@/components/ui/Button";
import { Download, HardDrive, Cpu, Zap, AlertTriangle } from "lucide-react";

interface DownloadOptionsProps {
    game: {
        magnetLink?: string | null;
        torrentLink?: string | null;
        directDownloadLink?: string | null;
    };
}

export function DownloadOptions({ game }: DownloadOptionsProps) {
    // Check if any download links are available
    const hasDownloads = game.magnetLink || game.torrentLink || game.directDownloadLink;

    if (!hasDownloads) {
        return (
            <div className="p-6 rounded-lg border border-yellow-500/20 bg-yellow-950/10 backdrop-blur-md">
                <p className="text-sm text-yellow-400/80 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Download links will be available soon. Check back later!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700 fade-in">
            <div className="p-6 rounded-lg border border-red-500/20 bg-red-950/10 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <AlertTriangle className="h-12 w-12 text-red-500/20" />
                </div>

                <h3 className="text-xl font-bold font-orbitron text-red-400 mb-4 flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    DOWNLOAD SOURCES
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {game.magnetLink && (
                        <a
                            href={game.magnetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline"
                        >
                            <Button className="w-full h-14 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500 text-red-400 flex flex-col items-center justify-center gap-1 group/btn">
                                <span className="font-bold flex items-center gap-2">
                                    MAGNET LINK <Zap className="h-3 w-3" />
                                </span>
                                <span className="text-[10px] text-red-400/60 group-hover/btn:text-red-400/80">
                                    Fastest • Peer-to-Peer
                                </span>
                            </Button>
                        </a>
                    )}

                    {game.torrentLink && (
                        <a
                            href={game.torrentLink}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline"
                        >
                            <Button className="w-full h-14 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500 text-red-400 flex flex-col items-center justify-center gap-1 group/btn">
                                <span className="font-bold flex items-center gap-2">
                                    TORRENT FILE <Download className="h-3 w-3" />
                                </span>
                                <span className="text-[10px] text-red-400/60 group-hover/btn:text-red-400/80">
                                    High Speed • .torrent
                                </span>
                            </Button>
                        </a>
                    )}

                    {game.directDownloadLink && (
                        <a
                            href={game.directDownloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline"
                        >
                            <Button className="w-full h-14 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500 text-blue-400 flex flex-col items-center justify-center gap-1 group/btn">
                                <span className="font-bold flex items-center gap-2">
                                    DIRECT DOWNLOAD
                                </span>
                                <span className="text-[10px] text-blue-400/60 group-hover/btn:text-blue-400/80">
                                    Mirror • Cloud Storage
                                </span>
                            </Button>
                        </a>
                    )}
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-red-400/60">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Warning: Use a VPN before downloading copyright material. The Network is watching.</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border border-white/10 bg-black/40">
                    <h3 className="text-lg font-bold font-orbitron text-white mb-4 flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-primary" />
                        MINIMUM REQUIREMENTS
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>OS</span>
                            <span className="text-white">Windows 10 / 11 (64-bit)</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>Processor</span>
                            <span className="text-white">Intel Core i5-8400 / AMD Ryzen 5 2600</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>Memory</span>
                            <span className="text-white">16 GB RAM</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>Graphics</span>
                            <span className="text-white">NVIDIA GeForce GTX 1060 6GB</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>Storage</span>
                            <span className="text-white">60 GB available space</span>
                        </li>
                    </ul>
                </div>

                <div className="p-6 rounded-lg border border-primary/20 bg-primary/5">
                    <h3 className="text-lg font-bold font-orbitron text-white mb-4 flex items-center gap-2">
                        <HardDrive className="h-5 w-5 text-primary" />
                        RECOMMENDED SPECS
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex justify-between border-b border-primary/10 pb-2">
                            <span>OS</span>
                            <span className="text-white">Windows 11 (64-bit)</span>
                        </li>
                        <li className="flex justify-between border-b border-primary/10 pb-2">
                            <span>Processor</span>
                            <span className="text-white">Intel Core i7-12700K / AMD Ryzen 7 5800X</span>
                        </li>
                        <li className="flex justify-between border-b border-primary/10 pb-2">
                            <span>Memory</span>
                            <span className="text-white">32 GB RAM</span>
                        </li>
                        <li className="flex justify-between border-b border-primary/10 pb-2">
                            <span>Graphics</span>
                            <span className="text-white">NVIDIA GeForce RTX 3080</span>
                        </li>
                        <li className="flex justify-between border-b border-primary/10 pb-2">
                            <span>Storage</span>
                            <span className="text-white">SSD (NVMe recommended)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
