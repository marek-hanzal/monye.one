import { TrpcEndpoint } from "@leight/trpc-server";
import { appRouter } from "@monye.one/trpc-server";
import { container } from "@/monye.one/server/container";

export default TrpcEndpoint(appRouter, container);
