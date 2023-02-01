import {TrpcEndpoint} from "@leight/trpc-server";
import {api} from "@monye.one/trpc-server";
import {container} from "@/monye.one/server/container";

export default TrpcEndpoint(api, container);
