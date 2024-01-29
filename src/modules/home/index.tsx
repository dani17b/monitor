import React, { useEffect, useState } from "react";
import "./home.css";
import { Artifact } from "../../components/artifact";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ArtifactForm } from "../../components/artifactForm";

export const Home = () => {
  const [artifacts, setArtifacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isArtifactFormOpen, setIsArtifactFormOpen] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedArtifact, setSelectedArtifact] = useState<any>(null);

  useEffect(() => {
    fetch("http://api.monitor.altiacamp.com/info")
      .then((response) => response.json())
      .then((data) => {
        setArtifacts(data);
        setLoading(false);
      });
  }, []);

  const deploy = (artifact: any) => {
    fetch("http://api.monitor.altiacamp.com/deploy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artifactName: artifact.artifactName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="home">
      {loading && <div>Loading...</div>}
      {!loading && artifacts && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {Object.keys(artifacts).map((artifactKey: string) => (
            <Artifact
              key={artifactKey}
              artifact={artifacts[artifactKey]}
              deploy={() => {
                setSelectedArtifact(artifacts[artifactKey]);
                onOpen();
              }}
              showEditArtifact={() => {
                setSelectedArtifact(artifacts[artifactKey]);
                setIsArtifactFormOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <div className="flex justify-end mt-2">
        <Button onPress={() => setIsArtifactFormOpen(true)}>
          Nuevo artefacto
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="rounded-none"
      >
        {selectedArtifact && (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Deploy
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Artifact"
                    placeholder="Enter your name"
                    value={selectedArtifact.artifactName}
                    readOnly
                    disabled
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                      deploy(selectedArtifact);
                    }}
                  >
                    Deploy
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
      <ArtifactForm
        visible={isArtifactFormOpen}
        onClose={() => {
          setIsArtifactFormOpen(false);
          setSelectedArtifact(null);
        }}
        artifact={selectedArtifact}
        deploy={(artifactInfo: any) => {
          fetch("http://api.monitor.altiacamp.com/artifact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(artifactInfo),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        }}
      />
    </div>
  );
};
