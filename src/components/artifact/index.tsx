import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip
} from "@nextui-org/react";
import "./artifact.css";
import { IoIosRocket, IoMdCreate } from "react-icons/io";
import { useState } from "react";

const timestampToTimeFromNow = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 24) {
    return `${Math.floor(hours / 24)}d ago`;
  }

  if (hours > 0) {
    return `${hours}h ago`;
  }

  if (minutes > 0) {
    return `${minutes}m ago`;
  }

  return `${seconds}s ago`;
}

export const Artifact = ({ artifact, deploy, showEditArtifact }: { artifact: any, deploy : any, showEditArtifact : any }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Card className="rounded-none">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600 flex items-center">
              <div className="artifact-status" />
              {artifact.artifactName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {artifact.domain}
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : "" + " rounded-none"
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => deploy()}
        >
          {isFollowed ? "Unfollow" : "Deploy"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          {artifact.description}
        </p>
        <span className="pt-2">
          <Chip className="rounded-none float-left mr-2">{artifact.type}</Chip>
          <Chip className="rounded-none float-left">{artifact.deployType}</Chip>
        </span>
      </CardBody>
      <CardFooter className="gap-3 flex">
        <div className="flex gap-1 text-default-400 text-small items-center">
          <IoIosRocket />
          Last deploy {timestampToTimeFromNow(artifact.instance.lastUpdate)}
        </div>
        <div className="flex flex-1 justify-end gap-1 text-default-400 text-small">
          <IoMdCreate className="cursor-pointer" onClick={() => showEditArtifact()}/>
        </div>
      </CardFooter>
    </Card>
  );
};
