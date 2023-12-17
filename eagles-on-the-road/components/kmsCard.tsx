interface KmsCardProps {
    km: number | undefined,
    pratice: number | undefined,
    runs: number | undefined
}

export function KmsCard({km, pratice, runs}: KmsCardProps) {
    return(
        <div className="bg-shoes bg-cover w-5/6 h-60 flex justify-between items-center shadow-2xl rounded-lg">
            <div className="w-32 text-white flex flex-col items-center gap-7 p-2">
                <div>
                    <p>Treinos:</p>
                    <p>{pratice ? pratice : 0} kms</p>
                </div>
                <div>
                    <p>Corridas:</p>
                    <p>{runs ? runs : 0} kms</p>
                </div>
            </div>
            <div className="p-4 h-full flex flex-col items-center justify-center gap-3">
                <p className="text-white text-center text-[1.5rem] max-w-[10rem]">Total de Kilometros percorridos:</p>
                <p className="text-[3rem] text-white">{km ? km : 0} kms</p>
            </div>
        </div>
    )
}