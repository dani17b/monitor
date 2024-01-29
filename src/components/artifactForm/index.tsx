import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const platforms = [
  { label: "NodeJS", value: "node" },
  { label: "Maven", value: "maven" },
];

const deployTypes = [
  { label: "Static content", value: "static" },
  { label: "Server", value: "server" },
];

export const ArtifactForm = (props: any) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (props.artifact) {
      setFormData(props.artifact);
    }else{
      setFormData({});
    }
  }, [props.artifact]);

  useEffect(() => {
    if (props.visible) {
      onOpen();
    } else {
      onClose();
    }
  }, [props.visible]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(visible) => {
        onOpenChange();
        if (!visible) {
          props.onClose();
        }
      }}
      className="rounded-none"
    >
      <ModalContent>
        {(onCloseNewArtifact) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              New artifact
            </ModalHeader>
            <ModalBody>
              <Input
                label="Artifact"
                placeholder="Artifact name"
                onChange={(e) =>
                  setFormData({ ...formData, artifactName: e.target.value })
                }
                value={formData.artifactName}
              />
              <Textarea
                label="Description"
                placeholder="Description"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
              />
              <Input
                type="url"
                label="Domain"
                placeholder="domain"
                labelPlacement="outside"
                onChange={(e) =>
                  setFormData({ ...formData, domain: e.target.value })
                }
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">
                      .altiacamp.com
                    </span>
                  </div>
                }
                value={formData.domain}
              />
              <Select
                label="Platform"
                placeholder="Select platform"
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                selectedKeys={[formData.type]}
              >
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Deploy type"
                placeholder="Select deploy type"
                selectedKeys={[formData.deployType]}
                onChange={(e) =>
                  setFormData({ ...formData, deployType: e.target.value })
                }
              >
                {deployTypes.map((deployType) => (
                  <SelectItem key={deployType.value} value={deployType.value}>
                    {deployType.label}
                  </SelectItem>
                ))}
              </Select>
              {formData.deployType === "static" && 
                <Input
                    label="Deploy target"
                    placeholder="Deploy target"
                    onChange={(e) =>
                    setFormData({ ...formData, deployTarget: e.target.value })
                    }
                    value={formData.deployTarget}
                />
              }
              {formData.deployType === "server" && 
                <Input
                    label="Deploy command"
                    placeholder="Deploy command"
                    onChange={(e) =>
                      setFormData({ ...formData, launchCommand: e.target.value })
                    }
                    value={formData.launchCommand}
                />
                }
              <Input
                label="Repository url"
                placeholder="Repository url"
                onChange={(e) =>
                  setFormData({ ...formData, repository: e.target.value })
                }
                value={formData.repository}
              />
              <Checkbox
                defaultSelected
                onChange={(e) =>
                  setFormData({ ...formData, private: e.target.checked })
                }
                value={formData.private}
              >
                Private repository
              </Checkbox>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onCloseNewArtifact}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onCloseNewArtifact();

                  props.deploy({
                    ...formData,
                    domain : formData.domain.indexOf(".altiacamp.com") != -1 ? formData.domain : (formData.domain + ".altiacamp.com")
                  });
                }}
              >
                {props.artifact  ? 'Update' : 'Create'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
