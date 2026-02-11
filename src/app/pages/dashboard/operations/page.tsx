import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    Button,
    SimpleGrid,
    Badge,
    Center,
    Input,
    Textarea,
    chakra,
} from "@chakra-ui/react";
import {
    FileText,
    Users,
    Gavel,
    Download,
    Cpu
} from "lucide-react";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { generateLegalDoc, generateOutsourcingBrief } from "@services/gemini.service";
import useAppStore from "@stores/app.store";
import { toaster } from "@components/ui/toaster";

export const OperationsHub = () => {
    const { niche } = useAppStore();
    const [docType, setDocType] = useState("NDA");
    const [partyNames, setPartyNames] = useState("");
    const [briefRole, setBriefRole] = useState("Video Editor");
    const [briefTask, setBriefTask] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const [activeTool, setActiveTool] = useState<'legal' | 'brief'>('legal');

    const handleGenerateLegal = async () => {
        if (!partyNames) {
            toaster.create({ title: "Party names required", type: "error" });
            return;
        }
        setIsLoading(true);
        setActiveTool('legal');
        try {
            const doc = await generateLegalDoc(docType, partyNames);
            setGeneratedContent(doc);
            toaster.create({ title: "Document Drafted!", type: "success" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateBrief = async () => {
        if (!briefTask) {
            toaster.create({ title: "Task description required", type: "error" });
            return;
        }
        setIsLoading(true);
        setActiveTool('brief');
        try {
            const brief = await generateOutsourcingBrief(briefRole, briefTask);
            setGeneratedContent(brief);
            toaster.create({ title: "Brief Created!", type: "success" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box p={{ base: 4, md: 8 }}>
            <VStack align="stretch" gap={8}>
                {/* Header */}
                <Box>
                    <Heading fontSize="2xl" color="bark.500" fontWeight="black" mb={1}>
                        Operations Hub
                    </Heading>
                    <Text color="bark.300">
                        Systemize and scale your workforce for the <b>{niche}</b> niche.
                    </Text>
                </Box>

                <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8}>
                    {/* Sidebar / Tools */}
                    <VStack align="stretch" gap={6} gridColumn={{ lg: "span 4" }}>
                        {/* Legal Section */}
                        <Box bg="white" p={6} borderRadius="2xl" borderWidth={1} borderColor="cream.200">
                            <HStack mb={4} color="bark.500">
                                <Gavel size={16} />
                                <Heading fontSize="md">Legal Draftsman</Heading>
                            </HStack>
                            <VStack align="stretch" gap={4}>
                                <Box>
                                    <chakra.label htmlFor="doc-type-select" fontSize="xs" fontWeight="bold" color="bark.400" mb={1} display="block">DOCUMENT TYPE</chakra.label>
                                    <select
                                        id="doc-type-select"
                                        value={docType}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setDocType(e.target.value)}
                                        className="tone-select"
                                        aria-label="Select Document Type"
                                        title="Document Type"
                                    >
                                        <option value="NDA">Non-Disclosure Agreement</option>
                                        <option value="Service Agreement">Service Agreement</option>
                                        <option value="Sponsorship Contract">Sponsorship Contract</option>
                                        <option value="Property Release">Property Release</option>
                                    </select>
                                </Box>
                                <Input
                                    size="sm"
                                    placeholder="Parties (e.g. My Agency & Brand X)"
                                    value={partyNames}
                                    onChange={(e) => setPartyNames(e.target.value)}
                                    bg="cream.50"
                                    title="Signatories"
                                    aria-label="Signatories"
                                />
                                <Button size="sm" bg="bark.500" color="white" onClick={handleGenerateLegal} loading={isLoading && activeTool === 'legal'}>
                                    Generate Draft
                                </Button>
                            </VStack>
                        </Box>

                        {/* Outsourcing Section */}
                        <Box bg="white" p={6} borderRadius="2xl" borderWidth={1} borderColor="cream.200">
                            <HStack mb={4} color="bark.500">
                                <Users size={16} />
                                <Heading fontSize="md">Freelancer Briefs</Heading>
                            </HStack>
                            <VStack align="stretch" gap={4}>
                                <Box>
                                    <chakra.label htmlFor="brief-role-select" fontSize="xs" fontWeight="bold" color="bark.400" mb={1} display="block">FREELANCER ROLE</chakra.label>
                                    <select
                                        id="brief-role-select"
                                        value={briefRole}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setBriefRole(e.target.value)}
                                        className="tone-select"
                                        aria-label="Select Freelancer Role"
                                        title="Freelancer Role"
                                    >
                                        <option value="Video Editor">Video Editor</option>
                                        <option value="Thumbnail Artist">Thumbnail Designer</option>
                                        <option value="Script Writer">Script Writer</option>
                                        <option value="Researcher">Niche Researcher</option>
                                    </select>
                                </Box>
                                <Textarea
                                    size="sm"
                                    placeholder="Task details (e.g. Edit a 10min YouTube video about...)"
                                    value={briefTask}
                                    onChange={(e) => setBriefTask(e.target.value)}
                                    bg="cream.50"
                                    h="100px"
                                    title="Task details"
                                    aria-label="Task details"
                                />
                                <Button size="sm" bg="bronze.500" color="white" onClick={handleGenerateBrief} loading={isLoading && activeTool === 'brief'}>
                                    Create Brief
                                </Button>
                            </VStack>
                        </Box>
                    </VStack>

                    {/* Main Content Area */}
                    <Box gridColumn={{ lg: "span 8" }} bg="cream.50" borderRadius="2xl" p={8} borderWidth={2} borderStyle="dashed" borderColor="cream.300">
                        {!generatedContent ? (
                            <Center h="full" flexDirection="column" textAlign="center" color="bark.200">
                                <Box mb={4} opacity={0.3}><FileText size={48} /></Box>
                                <Text fontWeight="bold">Operational Document Workspace</Text>
                                <Text fontSize="xs">Drafts and briefs will appear here for editing and export.</Text>
                            </Center>
                        ) : (
                            <VStack align="stretch" gap={6}>
                                <HStack justify="space-between">
                                    <Badge colorPalette={activeTool === 'legal' ? "blue" : "bronze"} variant="solid" p={2} borderRadius="md">
                                        {activeTool.toUpperCase()} DRAFT
                                    </Badge>
                                    <HStack>
                                        <Button size="sm" variant="outline" color="bark.400">Edit</Button>
                                        <Button size="sm" bg="bark.500" color="white" gap={2}>
                                            <Download size={14} /> Export PDF
                                        </Button>
                                    </HStack>
                                </HStack>

                                <Box bg="white" p={8} borderRadius="xl" shadow="md" borderWidth={1} borderColor="cream.200" flex={1} minH="500px">
                                    <Text whiteSpace="pre-wrap" fontSize="sm" color="bark.500" fontFamily="mono">
                                        {generatedContent}
                                    </Text>
                                </Box>

                                <HStack bg="bronze.50" p={4} borderRadius="xl" gap={3}>
                                    <Box color="bronze.500"><Cpu size={16} /></Box>
                                    <Box>
                                        <Text fontSize="xs" fontWeight="black" color="bronze.600">AI QUALITY ASSURANCE</Text>
                                        <Text fontSize="10px" color="bark.400">
                                            This draft was generated using standard templates. Please have a legal professional review all contracts before signing.
                                        </Text>
                                    </Box>
                                </HStack>
                            </VStack>
                        )}
                    </Box>
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default OperationsHub;
